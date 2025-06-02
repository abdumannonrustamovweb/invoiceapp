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
      className="border-2 border-transparent rounded-2xl w-full max-w-[712px] mx-auto transition-all transform hover:border-blue-300 hover:-translate-y-[2px] active:border-blue-400 active:shadow-md mb-3 active:-translate-y-[4px]"
    >
      <CardHeader>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-5 flex-1">
            <CardTitle className="text-base md:text-lg">#{postCode}</CardTitle>
            <CardDescription>{createdAt}</CardDescription>
            <span className="text-sm text-gray-500">{clientName}</span>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
            <span className="font-bold text-base md:text-lg">£{total}</span>
            <StatustBadge status={status} />
            <ArrowRight className="text-[#7C5DFA]" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default MyCard;
