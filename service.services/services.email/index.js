/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const client = require('@sendgrid/mail'); 
const Email  = require('./class');

const sendgrid_key = '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';

client.setApiKey( sendgrid_key );


export const sendEmail = ({ subject , html , sendTo }) => new Promise( ( resolve , reject ) => {

    let sender = Email.getEmail();

    const msg = {
        to:      sendTo , 
        from:    sender ,
        subject ,
        html
    }
    
    client
      .send( msg )
      .then( ( ) => resolve({
            status: 200, 
            msg: 'Mail sent successfully'
      }))
      .catch( error => {
            reject({
                status: 500, 
                msg: 'error sending message.',
                error
            })
      });
});