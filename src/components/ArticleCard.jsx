import React from 'react';
import { Link } from '@reach/router';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const ArticleCard = ({ article_id, title, topic, author, created_at, comment_count }) => {
    return (
        <Card>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    <Link to={`/articles/${article_id}`}>
                        <h2>{title}</h2>
                    </Link>
                </Typography>
                <Typography variant="h5" component="h2">
                By {author}
                </Typography>
                <Typography color="textSecondary">
                {topic}
                </Typography>
                <Typography variant="body2" component="p">
                Published on {moment(created_at).format("MMM Do YY")}
                <br />
                {comment_count} Comments
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ArticleCard;