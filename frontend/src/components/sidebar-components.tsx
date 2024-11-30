import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";

interface SheetDemoProps {
  cartItems: any[]; // Recibimos los items del carrito como prop
}

export function SheetDemo({ cartItems }: SheetDemoProps) {
  return (
    <div>
      <Sheet>
        <div className="flex items-center h-full text-center">
          <Button>
            <SheetTrigger className="text center">Abrir</SheetTrigger>
          </Button>
        </div>
        <div className="flex items-center text-center">
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-center">Carrito de Compras</SheetTitle>
              <SheetDescription>
                <b>Pagina de inicio: <Link href="/" className={buttonVariants()}>Inicio</Link></b>
              </SheetDescription>
            </SheetHeader>
            {/* Mostramos los productos del carrito */}
            <div className="py-4">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2">
                    <div>{item.name}</div>
                    <div>Qty: {item.quantity}</div>
                    <div>${item.price * item.quantity}</div>
                  </div>
                ))
              ) : (
                <p>No hay productos en el carrito.</p>
              )}
            </div>
          </SheetContent>
        </div>
      </Sheet>
    </div>
  );
}
