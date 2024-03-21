import { Card, CardBody, Text } from '@chakra-ui/react';

interface Props {
  body: string;
}

export const Article: React.FC<Props> = ({ body }) => {
  return (
    <Card>
      <CardBody>
        <Text>{body}</Text>
      </CardBody>
    </Card>
  );
};
