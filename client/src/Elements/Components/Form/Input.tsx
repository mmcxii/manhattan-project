import React from 'react';
import styled from 'styled-components';

import { spacing, roundedInner, black } from 'Utilities';

interface Props {
  name: string;
  value: string;
  onChange: any;
  type?: string;
  label?: string;
  placeholder?: string;
  icon?: string;
  required?: boolean;
}
export const Input: React.FC<Props> = ({
  name,
  type = 'text',
  label = name,
  placeholder = name,
  icon,
  value,
  onChange,
  required
}) => {
  return (
    <FormGroup hasIcon={icon !== undefined}>
      <FormLabel htmlFor={name}>{label}</FormLabel>

      {type === 'textarea' ? (
        <TextArea name={name} placeholder={placeholder} value={value} onChange={onChange} required={required} />
      ) : (
        <FormInput
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}

      {icon && <FormIcon className={icon} />}
    </FormGroup>
  );
};

const FormGroup = styled.div<{ hasIcon: boolean }>`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: ${props => (props.hasIcon ? 'max-content 1fr' : '1fr')};
  grid-template-areas: ${props => (props.hasIcon ? "'icon label' 'icon input'" : "'label' 'input'")};
  justify-content: center;
  align-items: center;
  grid-gap: ${spacing.sm};
`;

const FormLabel = styled.label`
  grid-area: label;

  text-transform: capitalize;
  font-size: 1.2rem;
`;

const FormInput = styled.input`
  grid-area: input;

  padding: ${spacing.sm} ${spacing.md};
  border-radius: ${roundedInner};
  border: none;
  color: ${black};
`;

const TextArea = styled.textarea`
  grid-area: input;
  resize: none;
  padding: ${spacing.sm} ${spacing.md};
  border-radius: ${roundedInner};
  border: none;
  color: ${black};
`;

const FormIcon = styled.i`
  grid-area: icon;

  font-size: 2rem;
`;
