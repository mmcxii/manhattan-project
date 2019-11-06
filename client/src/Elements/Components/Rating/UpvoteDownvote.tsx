import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

import { UserContext, UserProps } from 'Store';
import { transition, spacing, green, red } from 'Utilities';

interface Props {
  upvotes: UserProps[];
  downvotes: UserProps[];
  type: 'products' | 'comments';
  id: string;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

const UpvoteDownvote: React.FC<Props> = ({ upvotes, downvotes, type, id, setRating }) => {
  const { user } = useContext(UserContext);
  const [userVote, setUserVote] = useState<'upvote' | 'downvote' | null>(null);
  const [existingVote, setExistingVote] = useState<'upvote' | 'downvote' | null>(null);

  useEffect(() => {
    if (upvotes.includes(user.id)) {
      setUserVote('upvote');
      setExistingVote('upvote');
    } else if (downvotes.includes(user.id)) {
      setUserVote('downvote');
      setExistingVote('downvote');
    }
  }, [upvotes, downvotes, user._id]);

  const handleUpvote = () => {
    setUserVote('upvote');
    handleVote('upvotes');
  };

  const handleDownvote = () => {
    setUserVote('downvote');
    handleVote('downvotes');
  };

  const handleVote = async (action: 'upvotes' | 'downvotes') => {
    const lsLoginToken = localStorage.getItem('loginToken');
    const { username } = user;

    if (lsLoginToken) {
      try {
        const queryURL = `/api/${type}/${id}/${action}`;

        const response: Response = await fetch(queryURL, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${lsLoginToken}`
          },
          body: JSON.stringify({ username })
        });

        const data = await response.json();

        console.log(data)

        if (existingVote === null || existingVote !== userVote) {
          // If the user is casting a vote on something they have not voted on return the data as is
          action === 'upvotes' ? setRating(data - downvotes.length) : setRating(upvotes.length - data);
        } else {
          // If the user is modifying their vote on something offset the result by 1 to account for the change
          action === 'upvotes' ? setRating(data - downvotes.length + 1) : setRating(upvotes.length - data - 1);
        }
      } catch (err) {
        // TODO: Handle errors
        console.log(err);
      }
    }
  };

  // Buttons will not render if a user is not logged in
  if (user.username === '') {
    return null;
  }

  return (
    <Wrapper>
      <UpvoteButton onClick={() => (userVote !== 'upvote' ? handleUpvote() : null)} userVote={userVote === 'upvote'}>
        <i className='fas fa-arrow-alt-up' />
      </UpvoteButton>

      <DownvoteButton
        onClick={() => (userVote !== 'downvote' ? handleDownvote() : null)}
        userVote={userVote === 'downvote'}
      >
        <i className='fas fa-arrow-alt-down' />
      </DownvoteButton>
    </Wrapper>
  );
};

export default UpvoteDownvote;

const OptionButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  color: inherit;
  ${transition({ prop: 'color' })};
`;

const UpvoteButton = styled(OptionButton)<{ userVote: boolean }>`
  ${props => (props.userVote ? `color: ${green}` : null)};
  &:hover {
    color: ${green};
  }
`;

const DownvoteButton = styled(OptionButton)<{ userVote: boolean }>`
  ${props => (props.userVote ? `color: ${red}` : null)};
  &:hover {
    color: ${red};
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: ${spacing.xs};
`;
