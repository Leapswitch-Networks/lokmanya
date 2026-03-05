// import axios from 'axios';
// import axios from 'axios';
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
// import axiosConfig, { externalAxios } from '../../utils/axiosConfig';
import { recaptchverify } from '@/ApiActions/CommonApi';

const RecaptchaComponent = ({ onVerify }) => {
  const handleVerify = async (value) => {
    // const secretKey = process.env.REACT_APP_RECAPTCHA_SECRET_KEY;
    const secretKey = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';
     
   try {
      // Making the request to the server with the filters as params
      // const response = await axiosConfig.post('/recaptchverify', {
      //   secretKey: secretKey,
      //   value: value
      // });

     const response = await recaptchverify({
        secretKey: '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe',
        value: value
     })
      // console.log("Response",response.data);
     
      // return response.data;
    
        if (response.data.success && value != null) {
            onVerify(true);
        } else {
            onVerify(false);
        }
    } catch (error) {
      // Handle error appropriately
      console.error('Error verifying reCAPTCHA:', error);
      throw error;
    }
  };

  return (
    <ReCAPTCHA
      // sitekey={process.env.REACT_APP_RECAPTCHA_SECRET_KEY}
      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
      onChange={handleVerify}
    />
  );
};

export default RecaptchaComponent;