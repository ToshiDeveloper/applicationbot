export default [{
    name: "apply",
    description: "أوامر مسؤولين التقديم",
    options: [
      {
        name: "delete_all",
        description: "Delete all submissions from the data and delete all the data",
        type: 'SUB_COMMAND'
      }, {
        name: "set",
        description: "أنشاء تقديم جديد",
        type: 'SUB_COMMAND',
        options: [
          {
            name: `channel_logs`,
            channelTypes:['GUILD_TEXT'],
            description: `Select room logs`,
            required: true,
            type: "CHANNEL",
          },
          {
            name: `name`,
            description: `submission name`,
            required: true,
            type: "STRING",
          },
          {
            name: `button_name`,
            description: `أسم زرار التقديم`,
            required: true,
            type: "STRING",
          },
          {
            name: `message_content`,
            description: `Content of a message for those who will be presented`,
            required: true,
            type: "STRING",
          },
          {
            name: `button_color`,
            description: `نوع اجابة السؤال الاول`,
            required: true,
            choices:[
              {
                name:`Blue`,value:"1"
              },
              {
                name:`Green`,value:"3"
              },
              {
                name:`Gray`,value:"2"
              },
              {
                name:`Red`,value:"4"
              }
            ],
            type: "STRING",
          },
          {
            name: `question_name_1`,
            description: "The first question",
            required: true,
            type: "STRING",
          },
          {
            name: `question_type_1`,
            description: `Type of answer to the first question`,
            required: true,
            choices:[
              {
                name:`long answer`,value:"paragraph"
              },
              {
                name:`short answer`,value:"short"
              }
            ],
            type: "STRING",
          },
          {
            name: `question_name_2`,
            description: "السؤال الثاني",
            required: true,
            type: "STRING",
          },
          {
            name: `question_type_2`,
            description: `Question answer type`,
            required: true,
            choices:[
              {
                name: `long answer`,value:"paragraph"
              },
              {
                name:`short answer`,value:"short"
              }
            ],
            type: "STRING",
          },
          {
            name: `question_name_3`,
            description: "السؤال الثالث",
            required: true,
            type: "STRING",
          },
          {
            name: `question_type_3`,
            description: `Question answer type`,
            required: true,
            choices:[
              {
                name:`long answer`,value:"paragraph"
              },
              {
                name:`short answer`,value:"short"
              }
            ],
            type: "STRING",
          },
          {
            name: `question_name_4`,
            description: "السؤال الرابع",
            required: true,
            type: "STRING",
          },
          {
            name: `question_type_4`,
            description: `Question answer type`,
            required: true,
            choices:[
              {
                name:`long answer`,value:"paragraph"
              },
              {
                name:`short answer`,value:"short"
              }
            ],
            type: "STRING",
          },
          {
            name: `question_name_5`,
            description: "السؤال الخامس",
            required: true,
            type: "STRING",
          },
          {
            name: `question_type_5`,
            description: `Question answer type`,
            required: true,
            choices:[
              {
                name:`long answer`,value:"paragraph"
              },
              {
                name:`short answer`,value:"short"
              }
            ],
            type: "STRING",
          },
          {
            name: `image_url`,
            description: "If you have a picture, you can put the link to the picture",
            required: true,
            type: "STRING",
          }
        ]
      }]
  },
]