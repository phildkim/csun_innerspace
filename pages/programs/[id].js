import {
  EmotionImages,
  EmotionModels,
  Confirmation,
  Completion
} from '@/components';
import {
  useJWT,
  useAPI
} from '@/components/hooks';
import { Box } from '@material-ui/core';
import { useState } from 'react';

function GetProgram() {
  const { data, loading, error } = useAPI('/programs');
  let program;
  (loading || !data) ? '' :
    data.result.map((obj, i) => {
      program = obj.questions
    });
  return program || [];
};


export default function ProgramId() {
  const user = useJWT();
  const [stage, setStage] = useState(0);
  const [titleId, setTitleId] = useState(0);
  const [title, setTitle] = useState('');
  const [emotionId, setEmotionId] = useState(0);
  const [emotion, setEmotion] = useState('');
  let program = GetProgram();


  function onSelect1(info) {
    setStage(stage + 1);
    setTitleId(info.id);
    setTitle(info.title);
  };

  function onSelect2(info) {
    setStage(stage + 1);
    setEmotionId(info.id);
    setEmotion(info.emotions[titleId]);
  };

  async function onSelect3() {
    setStage(stage + 1);
    try {
      await handleStudent();
      await handleResult();
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  function onSelect4(info) {
    setStage(stage + 1);
  };

  async function handleStudent() {
    const res = await fetch(`/api/users/${user._id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify({ lastOnline: new Date() })
    });
    await res.json();
  }

  async function handleResult() {
    const res = await fetch('/api/results', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        user: user._id,
        titleId: parseFloat(titleId),
        title: `${title}`,
        emotionId: parseInt(emotionId),
        emotion: `${emotion}`,
        date: new Date(),
      })
    });
    await res.json();
  }

  // TODO: pass the program data to these components.
  const stages = [
    <EmotionImages
      onSelect={ onSelect1 }
      intro={ program[0] }
    />,
    <EmotionModels
      onSelect={ onSelect2 }
      title={ title }
      titleId={ titleId }
      intro={ program[1] }
    />,
    <Confirmation
      onSelect={ onSelect3 }
      title={ title }
      titleId={ titleId }
      emotion={ emotion }
      emotionId={ emotionId }
    />,
    <Completion
      onSelect={ onSelect4 }
    />
  ];

  return <>
    <Box width="100%" p={ [2, 3, 4] }>
      { stages[stage] }
    </Box>
  </>
}
