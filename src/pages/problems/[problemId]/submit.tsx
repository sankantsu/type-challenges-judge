import { Box, Button, Stack, Textarea } from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import { createSubmission } from '../../../use-cases/create-submission'
import { useAuth } from '../../../hooks/useAuth'
import { UnvalidatedSubmission } from '../../../model'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { ProblemLayoutContext } from '../../../components/ProblemLayout'
import { serverTimestamp, Timestamp } from 'firebase/firestore'

export const SubmitPage = () => {
  const [code, setCode] = useState<string>('')
  const { user } = useAuth()
  const { problem } = useOutletContext<ProblemLayoutContext>()
  const navigate = useNavigate()

  const handleInputChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setCode(event.currentTarget.value)
  }

  const handleSubmit = async () => {
    if (user === undefined) {
      // TODO: ログインしていないと提出できないようにする
      throw new Error('Please login')
    }

    const submission: UnvalidatedSubmission = {
      problemId: problem?.id as string,
      code,
      codeLength: code.length,
      status: 'Judging',
      createdAt: serverTimestamp() as Timestamp,
    }

    const userSubmission = await createSubmission(user.userId, submission)
    if (userSubmission !== undefined) {
      navigate(`/problems/${problem?.id}/submissions/${userSubmission.id}`)
    }
  }

  const canSubmit = useMemo(() => code.length > 0, [code])

  return (
    <Stack gap={2}>
      <Textarea onInput={handleInputChange} height={'xs'} />
      <Box>
        <Button
          disabled={!canSubmit}
          colorScheme={'blue'}
          onClick={handleSubmit}
        >
          提出する
        </Button>
      </Box>
    </Stack>
  )
}
