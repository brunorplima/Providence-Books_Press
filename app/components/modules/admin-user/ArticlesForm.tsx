import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { Article } from '../../../interfaces-objects/interfaces'
import EmptyUpdateFormMessage from './EmptyUpdateFormMessage'
import styles from '../../../styles/admin-user/ProductsForm.module.css';
import mainFormStyles from '../../../styles/form/MainForm.module.css';
import FormGroup from '../form/FormGroup';
import FormInput from '../form/FormInput';
import { LARGE, MEDIUM, X_SMALL } from '../../../util/inputFormSizes';
import Box from './Box';
import FormTextArea from '../form/FormTextArea';
import ImageFormInput from '../form/ImageFormInput';
import FormSelect from '../form/FormSelect';
import Button from '../../elements/button/Button';

const categories = ['Soteorology', 'Creeds and confessions', 'Worship service', 'Lord\'s Day', 'Christology', 'Predestination', 'Sola Scriptura', 'Christian life', 'Education', 'Eschatology', 'Sermons']

interface Props {
   readonly currentTab: string;
   readonly tabs: string[];
   readonly article?: Article;
   readonly setSelectedArticle?: Function
}

const ArticlesForm: React.FC<Props> = ({
   currentTab,
   tabs,
   article,
   setSelectedArticle
}) => {
   const [title, setTitle] = useState(article ? article.title : '')
   const [subtitle, setSubtitle] = useState(article ? article.subtitle : '')
   const [category, setCategory] = useState(article ? article.category : '')
   const [body, setBody] = useState(article ? article.body : '')
   const [image, setimage] = useState(article ? article.image : '')
   const [authorName, setAuthorName] = useState(article ? article.author.name : '')
   const [authorCredential, setAuthorCredential] = useState(article ? article.author.credential : '')
   const [authorAbout, setAuthorAbout] = useState(article ? article.author.about : '')

   useEffect(() => {
      return () => {
         if (currentTab === tabs[2]) setSelectedArticle(null);
      }
   }, [])

   if (currentTab === tabs[2] && !article) {
      return (
         <EmptyUpdateFormMessage messageType='article' />
      )
   }

   return (
      <div>
         <Box paddingAll title={`${currentTab === tabs[1] ? 'ADD' : 'UPDATE'} ARTICLE TO THE DATABASE`}>
            <FormGroup>
               <FormInput
                  type='text'
                  value={title}
                  setValue={setTitle}
                  size={LARGE}
                  label='Title'
                  isRequired
               />

               <FormInput
                  type='text'
                  value={subtitle}
                  setValue={setSubtitle}
                  size={LARGE}
                  label='Subtitle'
               />

               <ImageFormInput
                  inputClassName={mainFormStyles.inputField}
                  containerClassName={mainFormStyles.inputContainer}
                  setFiles={(e) => setimage(e.currentTarget.files)}
                  size={MEDIUM}
                  label='Image'
                  isRequired
               />

               <FormSelect
                  options={categories}
                  value={category}
                  setValue={setCategory}
                  selectClassName={mainFormStyles.selectField}
                  label='Category'
                  isRequired
                  containerClassName={mainFormStyles.selectContainer}
                  size={MEDIUM}
               />

               <FormTextArea
                  textareaClassName={mainFormStyles.textareaField}
                  containerClassName={mainFormStyles.textareaContainer}
                  value={body}
                  setValue={setBody}
                  label='Text body'
                  isRequired
               />
            </FormGroup>

            <div className={styles.space}></div>

            <FormGroup>
               <FormInput
                  type='text'
                  value={authorName}
                  setValue={setAuthorName}
                  size={MEDIUM}
                  label='Author name'
                  isRequired
               />

               <FormInput
                  type='text'
                  value={authorCredential}
                  setValue={setAuthorCredential}
                  size={X_SMALL}
                  label='Author honorific'
                  isRequired
               />

               <FormTextArea
                  textareaClassName={mainFormStyles.textareaField}
                  containerClassName={mainFormStyles.textareaContainer}
                  value={authorAbout}
                  setValue={setAuthorAbout}
                  label='About author'
               />
            </FormGroup>

            <div className={styles.buttonContainer}>
               <Button label='Save' clickHandler={() => { }} secondaryStyle />
            </div>
         </Box>
      </div>
   )
}

export default ArticlesForm
