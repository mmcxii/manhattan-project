import React, { useState, MouseEvent } from 'react';
import styled from 'styled-components';
interface Props {}
const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const Preview = styled.img`
  max-width: 150px;
`;
export const FileInput: React.FC<Props> = () => {
  const [file, selectFile] = useState<File | null>(null);
  // Update selected file
  const onFileSelected = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files == null) {
      return;
    }
    const inputFile: File = evt.target.files[0];
    selectFile(inputFile);
  };
  // Upload button click - upload file
  const uploadFile = async (evt: React.MouseEvent<HTMLButtonElement | MouseEvent>) => {
    if (file == null) {
      return;
    }
    const token: string | null = localStorage.getItem('loginToken');
    if (token == null) {
      return;
    }
    var data = new FormData();
    data.append('file', file);
    data.append('filename', file.name);
    const response = await fetch('/api/files/images', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: data
    });
  };
  const UploadButton = styled.button`
    visibility: ${file == null ? 'hidden' : 'visible'};
  `;
  return (
    <>
      <Container>
        <input name="upload" onChange={onFileSelected} accept="image/*" type="file" />
      </Container>
      ​
      <div>
        {file != null ? <Preview src={URL.createObjectURL(file)} /> : <></>}
        <br />
        <UploadButton onClick={uploadFile}>Upload</UploadButton>
      </div>
    </>
  );
};
