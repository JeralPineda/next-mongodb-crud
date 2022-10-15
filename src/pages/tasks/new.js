import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Form, Grid } from 'semantic-ui-react';

export default function NewTaskPage() {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
  });
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const validate = () => {
    let errors = {};

    if (!newTask.title) errors.title = 'El titulo es requerido';

    if (!newTask.title) errors.description = 'La descripción es requerida';

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();

    if (Object.keys(errors).length) return setErrors(errors);

    await createTask();

    router.push('/');
  };

  const createTask = async () => {
    try {
      await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => setNewTask({ ...newTask, [e.target.name]: e.target.value });

  return (
    <Grid
      //
      centered
      verticalAlign="middle"
      columns={3}
      style={{ height: '80vh' }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>Create Task</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              //
              label="Title"
              placeholder="Title"
              name="title"
              value={newTask.title}
              onChange={handleChange}
              error={errors.title ? { content: errors.title, poiting: 'below' } : null}
            />
            <Form.TextArea
              //
              label="Description"
              placeholder="Description"
              name="description"
              value={newTask.description}
              onChange={handleChange}
              error={errors.description ? { content: errors.description, poiting: 'below' } : null}
            />

            <Button
              //
              primary
              type="submit"
            >
              Save
            </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
