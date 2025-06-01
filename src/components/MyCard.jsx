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
        "border-2 border-transparent transition-colors hover:border-amber-300 max-w-[730px] w-full mx-auto rounded"
      }
    >
      <CardHeader>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="cards mr-auto">
            <CardTitle>#{postCode}</CardTitle>
            <CardDescription>{createdAt}</CardDescription>
            <span>{clientName}</span>
          </div>
          <div className="cards">
            <span>£{total}</span>
            <StatustBadge status={status} />
          </div>
          <ArrowRight className="text-[#7C5DFA] cordArrow" />
        </div>
      </CardHeader>
    </Card>
  );
}

export default MyCard;
