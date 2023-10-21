import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import { getQuestionById } from "@/lib/actions/question.action";
import { formatNumber, getTimestamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const result = await getQuestionById({ questionId: params.id });

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${result.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={result.author.picture}
              alt="Author picture"
              width={22}
              height={22}
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark-300_light-700">
              {result.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <p>VOTING</p>
          </div>
        </div>
        <h2 className="h2-semibold text-dark-200_light-900 mt-3.5 w-full text-left">
          {result?.title}
        </h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="upvotes"
          value={`asked ${getTimestamp(result.createdAt)}`}
          title=""
          textStyles="small-medium text-dark-400_light-800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatNumber(result.answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark-400_light-800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="views"
          value={formatNumber(result.views)}
          title=" Views"
          textStyles="small-medium text-dark-400_light-800"
        />
      </div>

      {result.content}
      <ParseHTML html={result.content} />

      <div className="mt-8 flex flex-wrap gap-5">
        {result.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>
    </>
  );
};

export default page;
