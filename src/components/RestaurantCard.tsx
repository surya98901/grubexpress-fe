
import {
  Card,
  CardDescription,

  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const  RestaurantCard=({data } : {data: any}) => {
  return (
    <Card className="mx-auto w-[15vw] h-[25vh] max-w-sm pt-0 border-1 border-green-700 bg-green-700">
      <img
        src="/defaultResIMG.png"
        alt="Event cover"
        className="aspect-video w-full rounded-b-xl  "
      />
      <CardHeader className="bg-green-700 text-white">
        <CardTitle>{data.Name}</CardTitle>
        <CardDescription className="flex flex-col text-white" >
          <p>{data.rating}</p>
          <p>{data.Cusine.join(", ")}</p>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
export default RestaurantCard