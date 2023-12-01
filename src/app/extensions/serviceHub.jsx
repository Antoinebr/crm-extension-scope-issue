import React, { useState } from "react";
import {
  Flex,
  Input,
  Button,
  StepIndicator,
  Alert,
  Divider,
  Text,
  Image,
  ToggleGroup,
} from "@hubspot/ui-extensions";
import { hubspot } from "@hubspot/ui-extensions";

// Define the extension to be run within the Hubspot CRM
hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <>
    <Extension context={context} runServerless={runServerlessFunction} />
  </>
));

// Define the Extension component, taking in runServerless, context, & sendAlert as props
const Extension = ({ context, runServerless, sendAlert }) => {
  const [deviceNumber, setDeviceNumber] = useState(" ");

  const [assignationResponse, setAssignationResponse] = useState("");

  const [response, setResponse] = useState([]);

  const [replacementDevices, setReplacementDevices] = useState([]);

  const [currentStep, setCurrentStep] = useState(0);

  // Call serverless function to execute with parameters.
  // The `myFunc` function name is configured inside `serverless.json`
  // propertiesToSend: ['hs_object_id'] ⬅ Only in production
  const handleClick = () => {
    runServerless({ name: "getData", parameters: { deviceNumber } })
      .then((resp) => {
        console.log(
          "resp.response",
          typeof resp.response,
          "resp.response",
          resp.response
        );

        // update the array
        setResponse(resp.response.map((res) => res));

        console.log("my array contains", response);
      })
      .catch((error) => {
        console.log("Error ❌", error);
      });
  };

  const searchReplacement = () => {
    runServerless({ name: "searchReplacement", parameters: { deviceNumber } })
      .then((resp) => {
        console.log(
          "resp.response",
          typeof resp.response,
          "resp.response",
          resp.response
        );

        // update the array
        setReplacementDevices(resp.response.map((res) => res));

        console.log("my array contains", replacementDevices);
      })
      .catch((error) => {
        console.log("Error ❌", error);
      });
  };

  return (
    <>
      <Text format={{ fontWeight: "bold" }}>Replace device </Text>
      <Flex direction="row" align="end" gap="small">
        <Input
          name="text"
          label="Device number"
          onInput={(value) => setDeviceNumber(value)}
          placeholder="Device number"
        />
        <Button type="submit" onClick={handleClick} variant="primary">
          {" "}
          Start a replacement procedure{" "}
        </Button>
      </Flex>
      <Text>
        {response &&
          response.length !== 0 &&
          response.map((resp) => (
            <>
              <Text format={{ fontWeight: "bold" }}> Existing device : </Text>
              <Text>
                {resp.brand} {resp.model} {resp.releaseYear}
              </Text>
              <Image
                alt="A picture of an adorable black lab puppy, click on me to see in a new tab"
                src={resp.image}
                width={200}
              />
              <Text>This Device is eligible for a refresh 👍</Text>
            </>
          ))}
      </Text>
      <Divider />
      {response && response.length !== 0 && (
        <>
          <Button type="submit" onClick={searchReplacement} variant="primary">
            Look for replacements
          </Button>

          <Text format={{ fontWeight: "bold" }}>
            Replacement possibilities :
          </Text>

          {replacementDevices && replacementDevices.length !== 0 && (
            <ToggleGroup
              name="toggle-checkboxes"
              label="Choose new device"
              error={false}
              options={replacementDevices}
              tooltip="Here's a secret tip."
              required={false}
              inline={false}
              toggleType="checkboxList"
              variant="default"
            />
          )}
        </>
      )}
    </>
  );
};