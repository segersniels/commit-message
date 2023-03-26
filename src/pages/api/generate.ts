import type { NextApiRequest, NextApiResponse } from 'next';
import { generate } from 'lib/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const prompt = `
    Refer to the provided git diff or code snippet and provide a suitable commit message.
    When reviewing the diff or code, focus on identifying the main purpose of the changes.
    Are they fixing a bug, adding a new feature, improving performance or readability, or something else?
    Use this information to craft a concise and meaningful commit message that clearly indicates what the provided snippet does.
    Remember, clarity and conciseness are key. Use simple language and avoid technical jargon.

    When reviewing a diff, pay attention to the changed filenames and use this information to extract the context of the changes.
    This will help you create a more relevant and informative commit message.
    If the user provides additional context, use it to further refine your message. But remember, the message should still be clear and concise.

    ${req.body.code}

    Optional additional context below:

    ${req.body.context}

    Your commit message should not exceed the 80 character limit. Try to stay away from convention prefixes.
    A good commit message should provide enough information to understand the changes without being too verbose.
`;

  const message = await generate(prompt);

  return res.status(200).json({ message });
}
