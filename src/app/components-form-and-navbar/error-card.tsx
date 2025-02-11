import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";

export const ErrorCard = ({ errorMessage, reset }:{errorMessage:any,reset:any}) => {
    return (
        <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Encurta Ai!</CardTitle>
          <CardDescription className="textoVermelho">Ocorreu um erro!</CardDescription>
        </CardHeader>
   
        <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
            <h2>{errorMessage}</h2>
              </div>
            </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={reset} type="submit">Voltar</Button>
        </CardFooter>
      </Card>
    
    
    )
}