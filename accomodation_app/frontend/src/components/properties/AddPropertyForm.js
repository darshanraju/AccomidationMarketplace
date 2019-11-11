import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone-uploader';

import { renderTextField } from '../../utils/renderFormComponents';
import { imgur } from '../../apis/imgur';
import axios from 'axios';
import FormData from 'form-data';

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

const RenderDropzoneField = () => {
  const getUploadParams = async ({ file }) => {
    const headers = {
      headers: {
        Authorization: "Client-ID f347b312670daae",
        "Content-Type": "multipart/form-data"
      }
    };

    let imageData = await toBase64(file);
    imageData = imageData.replace(RegExp('^.+,'), '');
    let bodyForm = new FormData();
    bodyForm.append('type', 'base64');
    bodyForm.append('image', imageData);

    let url = undefined;
    try {
      let response = await imgur.post('/image/', bodyForm, headers)
      if (response.status === 200) {
        url = response.data.data.link
        console.log(response.data.data.link)
      } else {
        throw 'Uploading image to imgur failed'
      }
    } catch (err) {
      console.log(err)
    }

    return { url: "https://i.imgur.com/2ZehSwr.png" }
  }

  const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*"
      styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
    />
  )
}

class AddProperty extends Component {
  state = { images: [] }

  previewImage = (event) => {
    this.setState({ images: this.state.images.append(event[0].preview) })
    console.log(this.state.images)
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.props.handleSubmit}>
          <div><Field name="address" component={renderTextField} label="Address" /></div>
          <div><Field name="suburb" component={renderTextField} label="Suburb" /></div>
          <div><Field name="postcode" component={renderTextField} label="Postcode" /></div>
          <div><Field name="price" component={renderTextField} label="Price" /></div>
          <div><Field name="no_guests" component={renderTextField} label="Number of Guests" /></div>
          <div><Field name="no_beds" component={renderTextField} label="Number of Beds" /></div>
          <div><Field name="no_bathrooms" component={renderTextField} label="Number of Bathrooms" /></div>
          <div>
            <Field
              name="images"
              component={RenderDropzoneField}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </React.Fragment>
    )
  }
}

export default reduxForm({ form: 'addProperty' })(AddProperty);