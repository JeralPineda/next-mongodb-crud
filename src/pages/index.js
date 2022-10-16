import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Card, CardHeader, Container, Grid, GridColumn } from 'semantic-ui-react';

const HomePage = ({ tasks }) => {
  const router = useRouter();

  if (tasks.length === 0)
    return (
      <Grid
        //
        centered
        verticalAlign="middle"
        columns={1}
        style={{ height: '80vh' }}
      >
        <GridColumn textAlign="center">
          <h1>Aun no hay tareas</h1>
          <Image src="https://static.vecteezy.com/system/resources/previews/004/968/590/original/no-result-data-not-found-concept-illustration-flat-design-eps10-simple-and-modern-graphic-element-for-landing-page-empty-state-ui-infographic-etc-vector.jpg" alt="imagen no data" width={400} height={400} />

          <div>
            <Button
              //
              primary
              onClick={() => router.push('/tasks/new')}
            >
              Create a Task
            </Button>
          </div>
        </GridColumn>
      </Grid>
    );
  return (
    <Container style={{ padding: '20px' }}>
      <Card.Group itemsPerRow={4}>
        {tasks.map((task) => (
          <Card key={task.id}>
            <Card.Content>
              <CardHeader>{task.title}</CardHeader>
              <p>{task.description}</p>
            </Card.Content>
            <Card.Content extra>
              <Button
                //
                primary
                onClick={() => router.push(`/tasks/${task.id}`)}
              >
                View
              </Button>
              <Button
                //
                onClick={() => router.push(`/tasks/${task.id}/edit`)}
              >
                Edit
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
};

export default HomePage;

export const getServerSideProps = async (context) => {
  const res = await fetch('http://localhost:3000/api/tasks');
  const tasks = await res.json();

  return {
    props: { tasks },
  };
};
