import React, { Component } from 'react';
import { Comment } from '../../../interfaces-objects/interfaces';
import styles from '../../../styles/articles/Comments.module.css';
import useScreenWidth from '../../../util/useScreenWidth';
import CirclesUI from '../../elements/circles-ui/CirclesUI';
import CommentBox from './CommentBox';
import CommentsForm from './CommentsForm';
import CommentsHeader from './CommentsHeader';

interface WrapperProps {
   readonly comments: Comment[];
}

const CommentsContainerWrapper: React.FC<WrapperProps> = ({ comments }) => {
   const screenWidth = useScreenWidth();
   return (
      <CommentsContainer
         comments={comments}
         screenWidth={screenWidth}
      />
   )
}

interface Props {
   readonly comments: Comment[];
   readonly screenWidth?: number;
}

interface State {
   text: string;
}

class CommentsContainer extends Component<Props, State> {

   constructor(props) {
      super(props);
      this.state = {
         text: ''
      }

      this.setText = this.setText.bind(this);
      this.submit = this.submit.bind(this);
   }

   setText(e: React.ChangeEvent<HTMLTextAreaElement>) {
      this.setState({ text: e.target.value });
   }

   submit() {

   }

   sortComments(comments: Comment[]) {
      const comms = comments.concat();
      const c = comms.sort((a, b) => a.dateTime > b.dateTime ? -1 : 1)
      return c;
   }

   render() {
      const { comments, screenWidth } = this.props;
      const { text } = this.state;
      const sortedComments = this.sortComments(comments);
      const isSmallScreen = screenWidth <= 500;
      return (
         <div className={styles.container}>
            <CommentsHeader totalComments={comments.length} />
            <CommentsForm
               text={text}
               setText={this.setText}
               submit={this.submit}
            />
            <div style={{
               display: 'grid',
               placeItems: 'center',
               marginBottom: '3rem',
               marginTop: '2rem'
            }}>
               <CirclesUI
                  style={{ width: isSmallScreen ? 14 : 20, height: isSmallScreen ? 14 : 20 }}
               />
            </div>
            {
               sortedComments.map(comment => {
                  return <CommentBox key={comment._id} comment={comment} />
               })
            }
         </div>
      )
   }
}

export default CommentsContainerWrapper;
