import { ArrowRight } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import StatustBadge from "./ui/StatustBadge";
import { useNavigate } from "react-router-dom";

function MyCard({
  postCode = "RT3080",
  createdAt = "Due 01 Oct 2021",
  clientName = "John Morrison",
  total = "14,002.33",
  status = "draft",
  id = "1",
}) {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`${id}`)}
      className={
        "border-2 border-transparent rounded-2xl min-w-[712px] w-full mx-auto transition-all transform hover:border-blue-300 hover:-translate-y-[2px] active:border-blue-400 active:shadow-md mb-3 active:-translate-y-[4px]"
      }
    >
      <CardHeader>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="cards mr-auto ">
            <CardTitle>#{postCode}</CardTitle>
            <CardDescription className="ml-5">{createdAt}</CardDescription>
            <span className="text-[15px] text-gray-500">{clientName}</span>
          </div>
          <div className="cards">
            <span className="font-black">£{total}</span>
            <StatustBadge status={status} />
          </div>
          <ArrowRight className="text-[#7C5DFA] cordArrow" />
        </div>
      </CardHeader>
    </Card>
  );
}

export default MyCard;
