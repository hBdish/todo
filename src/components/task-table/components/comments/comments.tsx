import styles from './comments.module.scss';
import {classNames} from "../../../../shared";
import {CommentType} from "./types";

interface CommentsProps {
  className?: string
  comment: CommentType[]
}


const Comments = (props: CommentsProps) => {
  const {className, comment} = props;


  const MapForComments = (props: CommentType) => {
    const {comments, commentText} = props

    return (
      <div>
        <span className={styles.commentText}>{commentText}</span>
        {comments.length !== 0 && comments.map((el, index) => {
            return (
              <MapForComments
                key={index}
                comments={el.comments}
                commentText={el.commentText}
              />)
          }
        )}
      </div>
    )
  }

  return (
    <div className={classNames(styles.Comments, {}, [className])}>
      {comment.map((el, index) =>
        <MapForComments key={index} commentText={el.commentText} comments={el.comments}/>)}
    </div>
  );
};

export {Comments};
