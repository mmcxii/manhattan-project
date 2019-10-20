import fs from 'fs';
import path from 'path';
import * as Http from 'http';
import socketio, { Server } from 'socket.io';

// Create new socket server
const io: Server = socketio();

// File upload namespace
const uploads = io.of('/uploads');

// Global constants for file uploads
const UPLOADS = new Map();
const SLICE_SIZE = 100000; // 100,000 bytes
const UPLOAD_DIR = path.join(__dirname, 'temp/uploads');

// Event handler for when a new socket connection is established.
// Attach necessary event handlers to new socket.
uploads.on('connection', socket => {

  console.log('Socket connected: ', socket.id);

  socket.emit('connected', {message: `Socket connected with id: ${socket.id}`});

  socket.on('file-slice-upload', file => {

    // Check if this is the first slice (new file upload)
    if (!UPLOADS.has(file.name)) {

      socket.emit('upload-start', { file: file.name });

      UPLOADS.set(file.name, {
        name: file.name,
        type: file.type,
        size: file.size,
        data: [],
        slice: 0
      });
    }

    const fileInfo = UPLOADS.get(file.name);
    fileInfo.data.push(file.data);
    fileInfo.slice++;

    // Check if more slices are needed, else notify end of upload
    // TODO - might need to be gte vs gt
    if (file.size >= fileInfo.slice * SLICE_SIZE) {
      uploads.emit('file-slice-request', { name: fileInfo.name, currentSlice: fileInfo.slice});
    } else {
      console.log('File Received:');

      const fileData = Buffer.concat(fileInfo.data);
      const filePath = path.join(UPLOAD_DIR, fileInfo.name);

      fs.writeFile(filePath, fileData, 'utf8', error =>{
        if (error) {
          socket.emit('upload-failure', {error})
        }
      });

      UPLOADS.delete(fileInfo.name);
      uploads.emit('end-upload');
    }
  });

  socket.on('file-not-found', file => {
    if (UPLOADS.get(file.name)) {
      UPLOADS.delete(file.name);
    }
  });

});

// Export function to attach HTTP server
export const SocketServer = (server: Http.Server) => {
  io.listen(server);
}