import React from 'react';
import * as axios from 'axios';
export default () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('xlsx', e.target.xlsx.files[0]);

    (async () => {
      const response = await axios.post('/api/workers/uploadWorkers', formData);
      // const response = await fetch('/api/workers/uploadWorkers', {
      //   method: 'POST',
      //   body: formData
      // })
    })()
    // console.log(e.target.xlsx.value)
  }
  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <input type="file" name="xlsx" />
      <input type='submit' value='Upload!' />
    </form>
  )
}
