"use client"
import {Flex,Text,VStack,Box,Button,Skeleton} from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'
import  GridCalendar  from './GridCalendar';
import {ArrowForwardIcon,ArrowBackIcon} from '@chakra-ui/icons'
import { useState } from 'react';

import { VscPerson } from "react-icons/vsc";
import { LuClock } from 'react-icons/lu';


const Calendar = () => {

    
  const namesOfDays = ["Mo","Tu","We","Th","Fr","Sa","Su"]
  const date = new Date()
  const[currentYear,SetCurrentYear] =useState(date.getFullYear())
  const[currentMonth,SetCurrenthMonth] =useState(date.getMonth())

 
  const showPrevMonth  = () =>{
    var date = new Date(currentYear,currentMonth -1 )
    SetCurrentYear(date.getFullYear())
    SetCurrenthMonth(date.getMonth())
  }
  const showNextMonth  = () =>{
    var date = new Date(currentYear,currentMonth + 1 )
    SetCurrentYear(date.getFullYear())
    SetCurrenthMonth(date.getMonth())
  }
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];


  return (
    <Flex  justifyContent={'center'} className=' w-full h-fit' backgroundColor={'#202024'} >
    <Flex    className=' w-full h-fit'  border={'1px'} borderColor={'#7A6868'} justifyContent={'center'} >
  <Flex className=' w-full h-fit' justifyContent={"center"}  backgroundColor={"#202024"}>
<VStack  className=' w-full h-fit p-[10px]'   align={"start"}    gap={"20px"}>

<div className=" w-ful h-fit p-[20px] flex flex-col justify-center items-center ">
    <h2 className="w-fit h-full text-white text-[16px] ">Günlük Yapmanız Gerekenleri Kaydedin , Takvime Günlük Yapmanız Gerekenleri Yazabilirsiniz.</h2>

    </div>

<VStack  className=' w-full h-fit p-[10px]'   align={"center"}    gap={"20px"}>
 
  <VStack className='w-[70%] p-[10px]'   backgroundColor={"white"}  gap={"9px"}>
       <Flex className='w-full' h={"46px"}   alignItems={"center"} justifyContent={"space-between"}   > 
       <Button onClick={showPrevMonth}>
       <ArrowBackIcon/>
       </Button>
       
       <Text fontSize={'30px'}> 
       {months[currentMonth]} {currentYear} </Text>
       <Button onClick={showNextMonth}>
       <ArrowForwardIcon/>
       </Button>
       
       </Flex>

      <Box  className=' w-full h-fit'>
        <Grid   className='w-full h-fit' templateColumns='repeat(7, 1fr)'  > 
          {namesOfDays.map(d =>(<GridItem  w='100%'  className='h-fit'>
        <Flex w='100%' className='w-full h-fit'  alignItems={"center"} justifyContent={"center"} > 
        <Text >{d}</Text>
     </Flex>
  </GridItem>))}
              <GridCalendar monthState = {currentMonth}
                            yearState = {currentYear}/>
           </Grid>
      </Box>
</VStack>


    </VStack >
    </VStack >
  </Flex>
  </Flex>     </Flex>
)
}

export default Calendar






