import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormSchema, schema } from './schema';

interface Props {
  onSubmit: (value: FormSchema) => void;
}

export const Form: React.FC<Props> = ({ onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormSchema>({ resolver: zodResolver(schema) });

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={8}>
        <Stack gap={4}>
          <FormControl isInvalid={!!errors.name} isRequired>
            <FormLabel>氏名</FormLabel>
            <Input {...register('name')} />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.email} isRequired>
            <FormLabel>メールアドレス</FormLabel>
            <Input {...register('email')} />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.description} isRequired>
            <FormLabel>詳細内容</FormLabel>
            <Textarea {...register('description')} />
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.group} isRequired>
            <FormLabel>所属グループ</FormLabel>
            <Select {...register('group')}>
              <option value="">選択してください</option>
              <option value="groupA">グループA</option>
              <option value="groupB">グループB</option>
              <option value="groupC">グループC</option>
              <option value="groupD">グループD</option>
            </Select>
            <FormErrorMessage>{errors.group?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.category} isRequired>
            <FormLabel>該当カテゴリー</FormLabel>
            <Select {...register('category')}>
              <option value="">選択してください</option>
              <option value="categoryA">カテゴリーA</option>
              <option value="categoryB">カテゴリーB</option>
              <option value="categoryC">カテゴリーC</option>
              <option value="categoryD">カテゴリーD</option>
            </Select>
            <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
          </FormControl>
        </Stack>
        <Flex justifyContent="center">
          <Button type="submit" colorScheme="blue">
            送信
          </Button>
        </Flex>
      </Stack>
    </form>
  );
};
