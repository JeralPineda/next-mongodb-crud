import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button, Form, Grid } from 'semantic-ui-react';

export default function NewAndEditTaskPage() {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, SetLoading] = useState(false);

  const { query, push } = useRouter();

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

    SetLoading(true);

    if (query.id) {
      await updateTask();
    } else {
      await createTask();
    }

    push('/');
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
      console.error(error);
    }
  };

  const updateTask = async () => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${query.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => setNewTask({ ...newTask, [e.target.name]: e.target.value });

  const getTask = async () => {
    const res = await fetch(`http://localhost:3000/api/tasks/${query.id}`);
    const data = await res.json();
    setNewTask({ title: data.title, description: data.description });
  };

  useEffect(() => {
    //
    if (query.id) getTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <h1>{query.id ? 'Update Task' : 'Create Task'}</h1>
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
              loading={loading}
            >
              {query.id ? 'Update' : 'Create'}
            </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
