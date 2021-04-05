import React from 'react';
import axios from 'axios';
const Url = 'https://605af4e427f0050017c05b1f.mockapi.io/Players';
export default function Api() {
  axios.create('', {
    baseUrl: Url,
  });
  return <div></div>;
}
