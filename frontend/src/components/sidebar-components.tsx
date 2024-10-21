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
      <div>
        <Sheet>
          <div className="flex items-center h-full text-center">
            <Button>
              <SheetTrigger className="text center">Open</SheetTrigger>
            </Button>
          </div>
          <div className="flex items-center text-center">
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-center">Inicio</SheetTitle>
                <SheetDescription>
                  <b>Pagina de inicio: <Link href="/" className={buttonVariants()}>
                    Inicio
                  </Link></b>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </div>
        </Sheet>
      </div>
    </>
  );
}
