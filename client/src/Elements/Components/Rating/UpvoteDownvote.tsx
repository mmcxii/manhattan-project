import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

import { UserContext, UserProps } from 'Store';
import { transition, spacing, green, red } from 'Utilities';

interface Props {
  rating: number;
  upvotes: UserProps[];
  downvotes: UserProps[];
  type: 'products' | 'comments';
  id: string;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

const UpvoteDownvote: React.FC<Props> = ({ upvotes, downvotes, type, id, setRating, rating }) => {
  const { user } = useContext(UserContext);
  const [userVote, setUserVote] = useState<'upvote' | 'downvote' | null>(null);

  useEffect(() => {
    if (upvotes.includes(user.id)) {
      setUserVote('upvote');
    } else if (downvotes.includes(user.id)) {
      setUserVote('downvote');
    }
  }, [upvotes, downvotes, user._id]);

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

        if (!response.ok) {
          return;
        }

        const { rating } = await response.json();
        if (!rating) {
          return;
        }

        // Update rating with value returned in response
        setRating(rating);
      } catch (err) {
        alert(`Error changing vote: ${err.message || err}`);
      }
    }
  };

  const handleUpvote = () => {
    setUserVote('upvote');
    handleVote('upvotes');
  };

  const handleDownvote = () => {
    setUserVote('downvote');
    handleVote('downvotes');
  };

  // Buttons will not render if a user is not logged in
  if (user.username === '') {
    return null;
  }

  return (
    <Wrapper>
      <UpvoteButton onClick={() => (userVote !== 'upvote' ? handleUpvote() : null)} userVote={userVote === 'upvote'}>
        <i className='fas fa-arrow-alt-up fa-lg' />
      </UpvoteButton>
      <RatingValue>{rating}</RatingValue>
      <DownvoteButton
        onClick={() => (userVote !== 'downvote' ? handleDownvote() : null)}
        userVote={userVote === 'downvote'}
      >
        <i className='fas fa-arrow-alt-down fa-lg' />
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
  outline: none;
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

const RatingValue = styled.p`
  margin: ${spacing.xs} auto;
  font-weight: bold;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
