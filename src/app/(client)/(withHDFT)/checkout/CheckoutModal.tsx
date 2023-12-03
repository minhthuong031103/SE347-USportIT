import DialogCustom from "@/components/ui/dialogCustom";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import { useState } from "react";
import MultiStepProgressBar from "./components/childComponents/MultiProgressBar";
import InformationForm from "./components/InformationForm";

interface CheckoutModalProps{
    isModalOpen:boolean;
    setIsModalOpen:(input:boolean)=>void;
}



const CheckoutModal=({isModalOpen, setIsModalOpen}:CheckoutModalProps)=>{
    const [page, setPage] = useState("1");


    return (
        <div className="w-full h-full px-1">
        <DialogCustom
          className="w-full lg:w-[50%] h-[80%] lg:h-[95%] flex items-center justify-center"
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          warningOnClose={true}
          callBack={() => {}}
        >

<div className="flex w-full flex-col gap-y-5">
<MultiStepProgressBar page={page} onPageNumberClick={()=>{}} />

<Tabs  
        selectedKey={page}
  

classNames={{
          tabList: "gap-6 w-full  ",
        
        }}  aria-label="Options">
 <Tab key={"1"} title="Information">
 <InformationForm setPage={setPage}/>

 </Tab>
 <Tab  key={"2"} title="Payment">
   <Card>
     <CardBody>
       Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
     </CardBody>
   </Card>  
 </Tab>
 <Tab  key={"3"} title="Videos">
   <Card>
     <CardBody>
       Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
     </CardBody>
   </Card>  
 </Tab>
</Tabs>
</div>

            </DialogCustom>
            </div>

    )


}
export default CheckoutModal