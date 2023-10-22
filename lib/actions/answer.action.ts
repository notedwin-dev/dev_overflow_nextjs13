"use server";

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { author, question, content, path } = params;

    const newAnswer = await Answer.create({
      author,
      question,
      content,
    });

    // Add the answer to the question's answers array
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // TODO: Add interaction...

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId } = params;

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();

    const { answerId, userId, hasUpvoted, hasDownvoted, path } = params;

    let updateQuery = {};

    // if the user has upvoted the answer, they clicked on the upvote button, that means they have decided to remove the upvote.
    if (hasUpvoted) {
      updateQuery = {
        // so we have to pull out the upvotes from the answer
        $pull: { upvotes: userId },
      };
    }
    // else if the user has downvoted the answer beforehand, that means they have decided that they want to upvote the answer instead.
    else if (hasDownvoted) {
      updateQuery = {
        // pulling out the downvotes from the answer
        $pull: { downvotes: userId },
        // and pushing new upvotes to the answer
        $push: { upvotes: userId },
      };
    }
    // if the user hasn't upvoted or downvoted the answer, but they clicked the upvote button, that means they have decided to upvote the answer.
    else {
      updateQuery = {
        // so we have to push the upvotes to the answer
        $addToSet: { upvotes: userId },
      };
    }

    // update the answer collections of our mongoDB database with the new query
    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    console.log({ answer });
    // Increment author's reputation

    // then we revalidate the path to refresh our page with the latest data.
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();

    const { answerId, userId, hasUpvoted, hasDownvoted, path } = params;

    let updateQuery = {};

    // if the user has downvoted the answer, they clicked on the downvote button, that means they have decided to remove the downvote.
    if (hasDownvoted) {
      updateQuery = {
        // so we have to pull out the downvotes from the answer
        $pull: { downvotes: userId },
      };
    }
    // else if the user has upvoted the answer beforehand, that means they have decided that they want to downvote the answer instead.
    else if (hasUpvoted) {
      updateQuery = {
        // pulling out the upvotes from the answer
        $pull: { upvotes: userId },
        // and pushing new downvotes to the answer
        $push: { downvotes: userId },
      };
    }
    // if the user hasn't upvoted or downvoted the answer, but they clicked the downvote button, that means they have decided to downvote the answer.
    else {
      updateQuery = {
        // so we have to push the downvotes to the answer
        $addToSet: { downvotes: userId },
      };
    }

    // update the answer collections of our mongoDB database with the new query
    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    console.log({ answer });
    // Increment author's reputation

    // then we revalidate the path to refresh our page with the latest data.
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
