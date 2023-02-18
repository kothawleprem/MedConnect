// import React,{useState} from 'react'
// import { TimePicker } from 'react-ios-time-picker';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
// import { useTheme } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';



// const Time = () => {
//     // const [value, setValue] = useState('10:00');

//     const onChange = (timeValue) => {
//         setValue(timeValue);
//      }

//      const currencies = [
//       {
//         value: 'USD',
//         label: '1',
//       },
//       {
//         value: 'EUR',
//         label: '2',
//       },
//       {
//         value: 'BTC',
//         label: '3',
//       },
//       {
//         value: 'JPY',
//         label: '4',
//       },
//       {
//         value: 'JPY',
//         label: '5',
//       },
//       {
//         value: 'JPY',
//         label: '6',
//       },
//       {
//         value: 'JPY',
//         label: '7',
//       },
//       {
//         value: 'JPY',
//         label: '8',
//       },
//       {
//         value: 'JPY',
//         label: '9',
//       },
//       {
//         value: 'JPY',
//         label: '10',
//       },
//       {
//         value: 'JPY',
//         label: '11',
//       },
//       {
//         value: 'JPY',
//         label: '12',
//       },
//     ];

//     const theme = useTheme();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleChangeIndex = (index) => {
//     setValue(index);
//   };

//   return (
    
//    <>
//       <Box
//       component="form"
//       sx={{
//         '& .MuiTextField-root': { m: 2, width: '15ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >  
//         <TextField
//           id="outlined-select-currency-native"
//           select
//           label="Hr"
//           defaultValue="EUR"
//           SelectProps={{
//             native: true,
//           }}
//           helperText="Please select your currency"
//         >
//           {currencies.map((option) => (
//             <option key={option.value} value={option.value}>
//               {option.label}
//             </option>
//           ))}
//         </TextField>
//       </Box>

   
//       <Box sx={{ bgcolor: 'background.paper', width: 500 }}>
//       <AppBar position="static">
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           indicatorColor="secondary"
//           textColor="inherit"
//           variant="fullWidth"
//           aria-label="full width tabs example"
//         >
//           <Tab label="Item One" {...a11yProps(0)} />
//           <Tab label="Item Two" {...a11yProps(1)} />
//           <Tab label="Item Three" {...a11yProps(2)} />
//         </Tabs>
//       </AppBar>
//       <SwipeableViews
//         axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
//         index={value}
//         onChangeIndex={handleChangeIndex}
//       >
//         <TabPanel value={value} index={0} dir={theme.direction}>
//           Item One
//         </TabPanel>
//         <TabPanel value={value} index={1} dir={theme.direction}>
//           Item Two
//         </TabPanel>
//         <TabPanel value={value} index={2} dir={theme.direction}>
//           Item Three
//         </TabPanel>
//       </SwipeableViews>
//     </Box>

   
//     </>
    
//   )
// }

// export default Time