"use client";

import * as React from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";

const ItemEditDraw = ({ data }: { data: any }) => {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      showSwipeHandle={isMobile}
      swipeDirection={isMobile ? "down" : "right"}
    >
      <DrawerTrigger
        render={<Button variant="secondary">Edit</Button>}
      />

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-xl font-bold">
            item #
          </DrawerTitle>

          <DrawerDescription>
        
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-6">

          {/* ADDRESS */}
          <div className="mb-6 space-y-5 border-b pb-5">
            <div>
              <p className="font-semibold">Restaurant </p>
              <p className="text-sm text-muted-foreground">
                
                Name
              </p>
              <p className="text-sm text-muted-foreground">
                resData ?.address.addressLine
              </p>
            </div>

            <div>
              <p className="font-semibold">Delivery Address</p>
              <p className="text-sm text-muted-foreground">
                Home
              </p>
              <p className="text-sm text-muted-foreground">
                Kashmirgadda, Karimnagar, Telangana 505001, India
              </p>
            </div>
          </div>

    
          <div className="mb-6 border-b pb-5">
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm text-muted-foreground">
              data.items.length ITEMdata.items.length  1 ? "S" : ""
            </p>


          </div>

     
          <div className="mt-6 space-y-3 border-t pt-5">
            <div className="flex justify-between font-semibold">
              <span>Item Total</span>
           
            </div>

            <div className="flex justify-between text-sm">
              <span>Restaurant Packaging</span>
              <span>₹10</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Delivery Fee</span>
              
            </div>

            <div className="flex justify-between text-sm">
              <span>Discount</span>
             
            </div>

            <div className="flex justify-between text-sm">
              <span>Taxes</span>
            
            </div>

            <div className="flex justify-between border-t pt-4 text-lg font-bold">
              <span>BILL TOTAL</span>
        
            </div>
          </div>
 
        <DrawerFooter>
          <Button className="h-[34px]">
            Help
          </Button>

          <DrawerClose
            render={
              <Button variant="outline">
                Close
              </Button>
            }
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ItemEditDraw;