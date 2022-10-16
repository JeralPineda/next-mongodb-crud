import Error from 'next/error';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Confirm, Grid } from 'semantic-ui-react';

export default function TaskDeatil({ task, error }) {
  const [confirm, setConfirm] = useState(false);
  const { query, push } = useRouter();
  const [isDeleting, SetIsDeleting] = useState(false);

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const deleteTask = async () => {
    const { id } = query;

    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = () => {
    SetIsDeleting(true);
    deleteTask();
    close();
    push('/');
  };

  if (error && error.statusCode) return <Error statusCode={error.statusCode} title={error.statusText} />;

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
          <h1>{task.title}</h1>
          <p>{task.description}</p>

          <div>
            <Button
              //
              color="red"
              onClick={open}
              loading={isDeleting}
            >
              Delete
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>

      <Confirm
        //
        open={confirm}
        onConfirm={handleDelete}
        onCancel={close}
        header="Eliminar tarea"
        content={`¿Estas seguro de eliminar esta tarea "${task.id}"?`}
      />
    </Grid>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const resp = await fetch(`http://localhost:3000/api/tasks/${id}`);

  if (resp.status === 200) {
    const task = await resp.json();

    return {
      props: { task },
    };
  }

  return {
    props: {
      error: {
        statusCode: resp.status,
        statusText: 'Invalid Id',
      },
    },
  };
}
