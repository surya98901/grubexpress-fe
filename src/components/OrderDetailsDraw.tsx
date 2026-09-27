"use client";

import * as React from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { Restaurant } from "@/types/restaurant";
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

const Draw = ({ data, resData }: { data: any, resData : Restaurant| null  }) => {
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
        render={<Button variant="secondary">View details</Button>}
      />

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-xl font-bold">
            Order #{data._id}
          </DrawerTitle>

          <DrawerDescription>
            {data.createdAt}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-6">

          {/* ADDRESS */}
          <div className="mb-6 space-y-5 border-b pb-5">
            <div>
              <p className="font-semibold">Restaurant </p>
              <p className="text-sm text-muted-foreground">
                
                {resData?.Name}
              </p>
              <p className="text-sm text-muted-foreground">
                {resData ?.address.addressLine}
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
            <div className="flex items-center gap-3">
              <span className="text-xl">
                {data.orderStatus === "DELIVERED" ? "✓" : "•"}
              </span>

              <div>
                <p className={data.orderStatus != "CANCELLED" ?"font-semibold text-green-700" : " font-semibold text-red-500" }>
                  {data.orderStatus}
                </p>

                <p className= {data.paymentStatus != "PENDING" ? "text-sm text-muted-foreground" : " text-sm text-red-500"}>
                  Payment: {data.paymentStatus}
                </p>
              </div>
            </div>
          </div>


          <div>
            <p className="mb-3 text-sm text-muted-foreground">
              {data.items.length} ITEM{data.items.length > 1 ? "S" : ""}
            </p>

            <div className="space-y-4">
              {data.items.map((item: any) => (
                <div
                  key={item.menuItemId}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <p className="font-medium">
                    {item.title} x {item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>

     
          <div className="mt-6 space-y-3 border-t pt-5">
            <div className="flex justify-between font-semibold">
              <span>Item Total</span>
              <span>₹{data.subTotal}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Restaurant Packaging</span>
              <span>₹10</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Delivery Fee</span>
              <span>₹{data.deliveryFee}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Discount</span>
              <span>-₹{data.discount}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Taxes</span>
              <span>₹{Math.ceil(data.tax)}</span>
            </div>

            <div className="flex justify-between border-t pt-4 text-lg font-bold">
              <span>BILL TOTAL</span>
              <span>₹{data.totalAmount}</span>
            </div>
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

export default Draw;