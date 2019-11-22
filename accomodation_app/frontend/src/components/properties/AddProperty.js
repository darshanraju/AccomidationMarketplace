import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { addProperty, addImage } from '../../actions';
import AddPropertyForm from './AddPropertyForm';

import { imgur } from '../../apis/imgur';

class AddProperty extends Component {
  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  uploadImage = async (image) => {
    var img = await this.toBase64(image)
    const blankReplace = new RegExp('^.+,');
    img = img.replace(blankReplace, '');

    const headers = {
      headers: {
        Authorization: "Client-ID f347b312670daae",
      }
    }

    var body = new FormData();
    body.set('type', 'base64');
    body.append('image', img);
    console.log(body);

    await imgur.post('image', body, headers)
      .then((response) => {
        console.log(response.data.data.link)
        this.props.addImage(response.data.data.link)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

  submit = async (formValues) => {
    await this.props.addProperty(formValues)
      .then(async () => {
        await this.asyncForEach(formValues.images, async (image) => {
          await this.uploadImage(image);
          console.log('Uploaded a image');
        })

        console.log('All images have been uploaded');
        this.props.history.push('/properties');
      })
      .catch((err) => {
        console.log('Add Property Form: Invalid inputs')
        console.log('Change for webpack');
        console.log(err);
      })
  }

  render() {
    return (
      <React.Fragment>
        <AddPropertyForm onSubmit={this.submit} />
      </React.Fragment>
    )
  }
}

export default compose(
  connect(null, { addProperty, addImage }),
  withRouter
)(AddProperty);