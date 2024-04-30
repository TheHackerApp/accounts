import { get, set } from 'react-hook-form';
import type { FieldError, FieldErrors, MultipleFieldErrors, Resolver } from 'react-hook-form';
import { ZodError } from 'zod';
import type { AnyZodObject, ParseParams, TypeOf, ZodIssue } from 'zod';

const isZodError = (error: unknown): error is ZodError => error instanceof ZodError;

/**
 * A re-implementation of the @hookform/resolvers zodResolver to customize error formatting
 */
export const resolver =
  <Schema extends AnyZodObject>(schema: Schema, schemaOptions?: Partial<ParseParams>): Resolver<TypeOf<Schema>> =>
  async (values) => {
    try {
      const data = await schema.parseAsync(values, schemaOptions);
      return { errors: {} as FieldErrors<TypeOf<Schema>>, values: data };
    } catch (error) {
      if (isZodError(error)) return { errors: fromZodError(error), values: {} };
      else throw error;
    }
  };

export const fromZodError = <Schema extends AnyZodObject>(
  zodError: ZodError<TypeOf<Schema>>,
): FieldErrors<TypeOf<Schema>> => {
  const errors = {} as FieldErrors<TypeOf<Schema>>;
  const paths = zodError.issues.map((issue) => issue.path.join('.'));

  for (const error of zodError.issues) {
    const [path, fieldError] = convertIssue(error);

    if (paths.some((p) => p.startsWith(path + '.'))) {
      const arrayErrors = Object.assign({}, get(errors, path));
      set(arrayErrors, 'root', fieldError);
      set(errors, path, arrayErrors);
    } else set(errors, path, fieldError);
  }

  return errors;
};

const convertIssue = (issue: ZodIssue): [string, FieldError] => {
  const { code, message } = issue;

  const path = issue.path.join('.');
  const fieldError: FieldError = {
    message,
    type: code,
    types: {
      [code]: message,
    },
  };

  if ('unionErrors' in issue) {
    const issues = flattenUnionIssues(issue);
    fieldError.types = issues.reduce((acc, error) => {
      if (error.code in acc) acc[error.code] = ([] as string[]).concat(acc[error.code] as string[], error.message);
      else acc[error.code] = error.message;
      return acc;
    }, {} as MultipleFieldErrors);
  }

  return [path, fieldError];
};

const flattenUnionIssues = (issue: ZodIssue): ZodIssue[] => {
  const issues = [issue];

  if ('unionErrors' in issue) {
    for (const unionError of issue.unionErrors) {
      for (const error of unionError.errors) {
        issues.push(...flattenUnionIssues(error));
      }
    }
  }

  return issues;
};
