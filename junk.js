`
Firestore-root
  |
  --- videos (collection)
       |
       --- $videoId (document)
             |
             --- name: "PSY - Gangnam Style"
             |
             --- comments (sub-collection)
                  |
                  --- $commentId (document)
                        |
                        --- comment: "Great video!"
                        |
                        --- name: "Alex"
                        |
                        --- replies (sub-collection)
                              |
                              --- $replyId (document)
                              |     |
                              |     --- name: "John"
                              |     |
                              |     --- reply: "I agree."
                              |
                              --- $replyId (document)
                                    |
                                    --- name: "Anna"
                                    |
                                    --- reply: "I agree too."

root/videos/$videoId/comments/$commentId/replies/$replyId

Because most of the time, we create a separate page for each type of data we want to display, such a schema makes sense. 
This is because we can create a query to get all the videos, 
and nothing more. If we want to see a single video then we need to dig a 
little deeper in the database to get the corresponding comments and replies.

The above structure can be also remodeled like this:

Firestore-root
  |
  --- videos (collection)
  |    |
  |    --- $videoId (document)
  |          |
  |          --- name: "PSY - Gangnam Style"
  |
  --- comments (sucollection)
  |    |
  |    --- $commentId (document)
  |          |
  |          --- comment: "Great video!"
  |          |
  |          --- name: "Alex"
  |
  --- replies (collection)
       |
       --- $replyId (document)
             |     |
             |     --- name: "John"
             |     |
             |     --- reply: "I agree."
             |
             --- $replyId (document)
                   |
                   --- name: "Anna"
                   |
                   --- reply: "I agree too."
`