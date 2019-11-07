import React, { useState } from 'react';
import { FileInput } from './FileInput';
import { IconButton, AvatarLg } from '../Components';

interface Props {
  imgUrl?: string;
}

export const AvatarUpdater: React.FC<Props> = () => {
  const userInfo: string | null = localStorage.getItem('userInfo');
  const { imgUrl } = userInfo != null ? JSON.parse(userInfo) : undefined;

  const [file, selectFile] = useState<File | null>(null);
  const [avatar, updateAvatar] = useState<string>();

  // Handle file selection events
  const fileInputChanged = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target == null || evt.target.files == null) {
      return;
    }

    const file: File = evt.target.files[0];

    selectFile(file);
    updateAvatar(URL.createObjectURL(file));
  };

  // Handle file upload
  const uploadFile = async function(evt: React.MouseEvent<HTMLElement, MouseEvent>) {
    evt.preventDefault();
    if (file == null) {
      alert('No file to upload. Select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', file.name);

    const token: string | null = localStorage.getItem('loginToken');
    if (token == null) {
      // No auth token
      alert('Not authorized. Please log in.');
      window.location.href = '/';
      return;
    }

    try {
      const response = await fetch('/api/files/images', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      await response.json();

      // Clear cached image
      await window.caches.delete(imgUrl);
    } catch (error) {
      alert(`Upload error: ${error.message}`);
    } finally {
      selectFile(null);
    }
  };

  return (
    <>
      <FileInput name='select file' accept='image/*' onChange={e => fileInputChanged(e)} />

      <div>
        <AvatarLg src={avatar || imgUrl} />
      </div>
      {file != null && (
        <div>
          <IconButton icon='fas fa-file-upload fa' onClick={e => uploadFile(e)} />
        </div>
      )}
    </>
  );
};
