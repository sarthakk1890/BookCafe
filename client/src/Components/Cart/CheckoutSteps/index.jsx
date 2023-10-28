import React, { Fragment } from 'react'
import "./style.css"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import { MdLocalShipping, MdAccountBalance } from 'react-icons/md'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { StepLabel } from '@mui/material';

const CheckoutSteps = ({ activeStep }) => {

    const steps = [
        {
          label: <Typography>Shipping Details</Typography>,
          icon: <MdLocalShipping />,
        },
        {
          label: <Typography>Confirm Order</Typography>,
          icon: <BsFillCartCheckFill />,
        },
        {
          label: <Typography>Payment</Typography>,
          icon: <MdAccountBalance />,
        },
      ];
    
      const stepStyles = {
        boxSizing: "border-box",
        padding: "100px 10px 30px"
      };
    
      return (
        <Box sx={{ width: '100%' }}>
          <Stepper className="stepper" alternativeLabel activeStep={activeStep} style={stepStyles}>
            {steps.map((item, index) => (
              <Step
                key={index}
                active={activeStep === index ? true : false}
                completed={activeStep >= index ? true : false}
              >
                <StepLabel
                  style={{
                    color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
                  }}
                  icon={item.icon}
                >
                  {item.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      );
}

export default CheckoutSteps
