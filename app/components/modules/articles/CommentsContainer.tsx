import { NextRouter, useRouter } from 'next/router';
import React, { Component } from 'react';
import { addComment } from '../../../firebase/add';
import { Comment, User } from '../../../interfaces-objects/interfaces';
import { openDialog } from '../../../redux/actions/openedDialogNameAction';
import styles from '../../../styles/articles/Comments.module.css';
import useScreenWidth from '../../../util/useScreenWidth';
import { useAuth } from '../../contexts/AuthProvider';
import CirclesUI from '../../elements/circles-ui/CirclesUI';
import { ADD_REVIEW_COMMENT_UNLOGGED } from '../dialog/dialogNames';
import CommentBox from './CommentBox';
import CommentsForm from './CommentsForm';
import CommentsHeader from './CommentsHeader';

interface WrapperProps {
   readonly comments: Comment[];
   readonly articleId: string;
}

const CommentsContainerWrapper: React.FC<WrapperProps> = ({ comments, articleId }) => {
   const screenWidth = useScreenWidth();
   const { providenceUser } = useAuth()
   const router = useRouter()
   return (
      <CommentsContainer
         {...{ screenWidth, providenceUser, comments, articleId, router }}
      />
   )
}

interface Props {
   readonly screenWidth: number;
   readonly providenceUser: User;
   readonly router: NextRouter
}

interface State {
   text: string;
}

class CommentsContainer extends Component<Props & WrapperProps, State> {

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

   async submit() {
      const { providenceUser, articleId, router } = this.props
      if (!providenceUser) {
         openDialog(ADD_REVIEW_COMMENT_UNLOGGED)
         return
      }
      const comment: Comment = {
         _id: Date.now().toString(),
         _userId: providenceUser._id,
         _articleId: articleId,
         dateTime: new Date(Date.now()),
         userName: `${providenceUser.firstName} ${providenceUser.lastName}`,
         body: this.state.text
      }
      const commRef = await addComment(comment)
      if (commRef) {
         router.reload()
      }
   }

   sortComments(comments: Comment[]) {
      const comms = comments.concat();
      const c = comms.sort((a, b) => a.dateTime > b.dateTime ? -1 : 1)
      return c;
   }

   render() {
      const { comments, screenWidth, providenceUser } = this.props;
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
               providenceUser={providenceUser}
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
