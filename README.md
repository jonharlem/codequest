#codequest.io Project Proposal
>What is codequest.io?

codequest.io is *the* database for discovering the questions that are being asked at interviews.

>Who uses it?

codequest.io is the go to site for interview questions. Used by developers looking to research the interview process of a companies and used by companies to help create engaging problems that test the skills of potential employees.

>What are the outputs?

- search, explore, and filter various interview questions that others users have encountered while going through the interview process
- company info
- general questions
- vizualizations of data

>What are the inputs?

- Interview questions
- Company
- Category of qeustion
- User interview result
- Stage of interview process

>List of tech:

- AngularJS
- Node.js
- Express
- PostgreSQL
- knex
- D3.js
- Electron (stretch goal)

>Feature list

- Dashboard of question categories/companies
- Search/filter question type/tag (html, css, javascript, position interviewed for, front-end, backend, etc.)
- User profile (job, companies applied to, linked-in, resume, etc.)
- Company profile (info about company, jobs users interviewed for, popular questions or categories)

##Group Workflow
We will be using a feature branch workflow. Each feature will have a separate branch which can be worked on by the team and eventually merged into the master branch upon QA testing.


####GitHub

Always have the latest version of the repo:

```
git pull origin master
```

When starting a new feature, create a new branch:

```
$ git checkout -b [name_of_new_branch]
```

Push the branch to github:

```
$ git push origin [name_of_new_branch]
```

Create a pull request.

#####Fetch other peoples branches

Fetch all the branches:

```
$ git fetch -a
```

See all the branches:

```
$ git branch -a
```

Switch branches:
```
$ git checkout branchName
```

