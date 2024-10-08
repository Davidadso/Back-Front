import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";


export function SheetDemo() {
  return (
    <>
      <Sheet>
        <div className="flex items-center h-full">
          <Button>
            <SheetTrigger>Open</SheetTrigger>
          </Button>
        </div>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Inicio</SheetTitle>
            <SheetDescription>
              <Link href="/" className={buttonVariants()}>
                Inicio
              </Link>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
