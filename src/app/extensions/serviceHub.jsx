import React, { useState } from 'react';
import {
  Flex,
  Input,
  Button,
  Divider,
  Text
} from '@hubspot/ui-extensions';
import { hubspot } from '@hubspot/ui-extensions';



// Define the extension to be run within the Hubspot CRM
hubspot.extend(({ context, runServerlessFunction, actions }) =>(
  <>  
      <Extension context={context}  runServerless={runServerlessFunction} />
  </>
));

// Define the Extension component, taking in runServerless, context, & sendAlert as props
const Extension = ({ context, runServerless, sendAlert }) => {  

  const [postalCode, setPostalCode] = useState(" ")
  
  const [assignationResponse, setAssignationResponse] = useState("")

  const [response, setResponse] = useState([]);

  // Call serverless function to execute with parameters.
  // The `myFunc` function name is configured inside `serverless.json`
  const handleClick = () => {
    runServerless({ name: "getData", parameters: { postalCode },  propertiesToSend: ['hs_object_id']  }).then((resp) =>{


      console.log( "resp.response", typeof  resp.response, "resp.response", resp.response);
      
  
      // update the array 
      setResponse(resp.response.map(res => res));

      console.log('my array contains', response);

    }).catch(error =>{
      console.log("Error ❌", error);
    })
  };

  return (
    <>
      <Text format={{ fontWeight: "bold" }}>
        Assign an owner to this contact :p  
      </Text>
      <Flex direction="row" align="end" gap="small">
        <Input name="text" label="Postal Code" onInput={(value) => setPostalCode(value)}  placeholder='The postal code'/>
        <Button type="submit" onClick={handleClick}> Set a contact owner</Button>
      </Flex>
      <Text>

        {response.map(resp =>(        
                <Text>{resp.title}</Text>
        ))}
      </Text>
      <Divider />
    </>
  );
};

