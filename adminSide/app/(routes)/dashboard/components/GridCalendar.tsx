"use client"
import  {  useEffect, useState } from 'react'
import { GridItem } from '@chakra-ui/react'
import {Flex,Text,Button,HStack,Textarea ,Checkbox} from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

import React from 'react'
import { cn } from '@/lib/utils'

const GridCalendar = ({monthState,yearState} : {monthState:number,yearState:number }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
 



  const currentYear = yearState;
  const currentMonth =  monthState ; 
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  
  function datesForGrid(year, month) {
    var dates= [];

    var firstDay = new Date(year, month).getDay() -1 ;
    var totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    var totalDaysInPrevMonth = new Date(year, month, 0).getDate();

    for(var i = 1; i <= firstDay; i++) {
        var prevMonthDate = totalDaysInPrevMonth - firstDay + i;
        var key = new Date(year, month -1, prevMonthDate).toLocaleString();    
        dates.push({key: key, date: prevMonthDate, monthClass:'prev'});
      }

      var today = new Date();
      for(var i = 1; i <= totalDaysInMonth; i++) {
        var key = new Date(year, month, i).toLocaleString();
        if(i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
          dates.push({key: key, date: i, monthClass: 'current', todayClass: 'today'});
        }
        else{ 
          dates.push({key: key, date: i, monthClass: 'current'});
        }
      }  
      
      /* user oluşturulduktan sonra hergün modal olmaya başlicak  */

      var gridsize = 35;
    if(dates.length < gridsize) {
    var count = gridsize - dates.length;
    for(var i = 1; i <= count; i++) {
        var key = new Date(year, month + 1, i).toLocaleString();
        dates.push({key: key, date: i, monthClass:'next'});
    }
    }
    return dates;
    }
    const [today,newToday] = useState("")
    const handleClick = (e) => {
      e.preventDefault()
      localStorage.setItem("todo",today)
      }
      useEffect(() => {
        const todo = localStorage.getItem("todo")
        newToday(todo!)
      },[])
    return (
      datesForGrid(currentYear,currentMonth).map((date) => (  
        
          <GridItem  w='100%' h='70px' border='1px' borderColor={'#D5D4DF'} >
          <Flex w='100%' h='70px'  alignItems={"center"} justifyContent={"center"} > 
         {date.todayClass  ?  
                  <>
         <Button onClick={onOpen}>{date.date}</Button>
         <Modal
         isOpen={isOpen}
         onClose={onClose}
         
       >
         <ModalOverlay />
         <ModalContent bg={'#202024'}  >
           <Flex h={'87px'}  justifyContent = {'center'} alignItems={'center'}><Text fontSize={'36px'} color={'white'} > {months[currentMonth]} {currentYear}</Text></Flex>
           <ModalCloseButton />
            <Flex h={'100px'} justifyContent = {'start'} alignItems={'center'}><Text fontSize={'24px'} color={'white'} ml={'20px'}> {date.date} {months[currentMonth]} {currentYear}  </Text> </Flex>
           <ModalBody pb={6}>
            <div className='w-full h-fit flex flex-col bg-white rounded-[15px] p-[10px] gap-[10px]'>
          <h2 className=' underline'>Bugün Yapacaklarım</h2>
           <Textarea value={today} onChange={ (e) => {newToday(e.target.value)}} placeholder={today}/>
 
            </div>

        

           </ModalBody>
 
           <ModalFooter>
             <Button onClick = {handleClick}colorScheme='black ' mr={3}>
               Kaydet 
             </Button>
             <Button onClick={onClose}>Cancel</Button>
           </ModalFooter>
         </ModalContent>
         </Modal>
         </>
         :date.monthClass == 'prev'    || date.monthClass == 'next' ?  <Text  id={date.key}   p='5'  filter='auto' brightness='80%'  bg='white' > {date.date} </Text> :  <Text  id={date.key}    bg='white' > {date.date} </Text>  }
       </Flex>
    </GridItem>


        ))
    


          

)
}

export default GridCalendar


