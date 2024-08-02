// services/questionService.js

const awsS3Service = require('./awsS3Service');
const questionRepository = require('./questionRepository');
const topicService = require('./topicService');
const languageService = require('./languageService');
const questionRecordMapper = require('./questionRecordMapper');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs').promises;

class QuestionService {
  constructor() {
    this.bucketName = process.env.AWS_BUCKET_NAME;
    this.tempDirectory = process.env.TEMP_DIRECTORY || '/tmp';
  }

  async getAllQuestions() {
    const questions = await questionRepository.findAll();
    return questions.map(questionRecordMapper.toAdminQuestionDetails);
  }

  async uploadInputFilesToS3(questionId, inputFiles) {
    const question = await questionRepository.findById(questionId);
    if (!question) throw new Error('Incorrect question id');

    try {
      const inputFilesToUpload = [];
      for (const inputFile of inputFiles) {
        const inputFilePath = path.join(this.tempDirectory, inputFile.filename);
        await inputFile.mv(inputFilePath); // Assuming you're using a library like express-fileupload
        inputFilesToUpload.push(inputFilePath);
      }

      const s3TargetDirectoryPath = `${questionId}/`;
      const inputFileURLs = await awsS3Service.bulkUploadFiles(
        this.tempDirectory,
        inputFilesToUpload,
        this.bucketName,
        s3TargetDirectoryPath
      );

      for (const file of inputFilesToUpload) {
        await fs.unlink(file);
      }

      return inputFileURLs;
    } catch (error) {
      console.error('Error while file-upload: ', error);
      throw error;
    }
  }

  async saveQuestion(questionRequestRecord) {
    const topics = await topicService.getAllByIds(questionRequestRecord.topicIds);

    const languageTemplateMapping = questionRequestRecord.languageTemplates;
    const questionLanguageTemplates = await Promise.all(
      Object.keys(languageTemplateMapping).map(async languageId => {
        const language = await languageService.getLanguageById(languageId);
        return {
          language,
          template: languageTemplateMapping[languageId],
        };
      })
    );

    const languageSolutionMap = questionRequestRecord.solutions;
    const languages = await languageService.getLanguagesByIds(Object.keys(languageSolutionMap));
    const newSolutions = languages.map(language => {
      const solutionRequestDTO = languageSolutionMap[language.id];
      return {
        solution: solutionRequestDTO.solution,
        language,
        complexity: solutionRequestDTO.complexity,
        explanation: solutionRequestDTO.explanation,
        optimization: solutionRequestDTO.optimization,
        createdAt: new Date(),
      };
    });

    let question;
    if (questionRequestRecord.id) {
      question = await questionRepository.findById(questionRequestRecord.id);
      if (question) {
        Object.assign(question, {
          heading: questionRequestRecord.heading,
          difficulty: questionRequestRecord.difficulty,
          tier: questionRequestRecord.tier,
          solutionTier: questionRequestRecord.solutionTier,
          questionDescription: questionRequestRecord.questionDescription,
          datasetDescription: questionRequestRecord.datasetDescription,
          columnDefinition: questionRequestRecord.columnDefinition,
          active: questionRequestRecord.active,
          inputFiles: questionRequestRecord.inputFilesS3URLS.map(path => ({
            path,
            createdAt: new Date(),
          })),
          solutions: newSolutions,
          topics,
          templates: questionLanguageTemplates,
        });
      }
    }

    if (!question) {
      question = questionRecordMapper.toQuestion(questionRequestRecord);
      question.topics = topics;
      question.solutions = newSolutions;
      question.templates = questionLanguageTemplates;
      await questionRepository.save(question);
    }

    return questionRecordMapper.toQuestionDTO(question);
  }

  async deleteQuestionById(id) {
    const question = await questionRepository.findById(id);
    if (question) {
      question.active = false;
      await questionRepository.save(question);
      return true;
    }
    return false;
  }

  async getById(id) {
    return await questionRepository.findById(id);
  }

  async getQuestionDetailsById(questionId) {
    const question = await questionRepository.findById(questionId);
    if (question) {
      return questionRecordMapper.toAdminQuestionDetails(question);
    }
    return null;
  }
}

module.exports = new QuestionService();
