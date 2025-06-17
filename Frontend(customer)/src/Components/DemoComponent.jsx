import { Container, Title, Text, Group, Button } from "@mantine/core";
import { Link } from "react-router-dom";
// import { IconHome, IconRocket, IconInfoCircle } from "@mantine/core";
import { FaHome, FaRocket, FaInfoCircle } from "react-icons/fa";

import classes from "./DemoComponent.module.css";

const DemoComponent = () => {
  return (
    <div className={classes.root}>
      <Container size="md">
        {/* Error code/status */}
        <div className={classes.label}>DEMO</div>

        {/* Main title */}
        <Title className={classes.title} order={1}>
          Welcome to  Demo Component
        </Title>

        {/* Description with more content */}
        <Text size="lg" ta="center" className={classes.description} mt="md">
          This interactive demo shows what happens when you click footer links.
        </Text>


        {/* Action buttons */}
        <Group justify="center" mt={30}>
          <Button
            component={Link}
            to="/"
            variant="white"
            size="md"
            className={classes.homeButton}
            leftSection={<FaHome size={20} />}
          >
            Go to Home page
          </Button>

        </Group>
      </Container>
    </div>
  );
};

export default DemoComponent;
