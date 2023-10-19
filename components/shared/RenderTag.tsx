import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface Props {
  _id: number;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}

const RenderTag = ({ _id, name, totalQuestions, showCount }: Props) => {
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between gap-2">
      <Badge className="subtle-medium background-light-800_dark-300 text-light-400_light-500 rounded-md border-none px-4 py-2 uppercase">
        {name}
      </Badge>

      {showCount && (
        <p className="small-medium text-dark-500_light-700">{totalQuestions}</p>
      )}
    </Link>
  );
};

export default RenderTag;
