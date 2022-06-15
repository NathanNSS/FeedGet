import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedBackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedBackSpy },
    { sendMail: sendMailSpy }
)

describe('Submit Feedback', () => {
    test("should be able to submit a feedback", async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: "example comment",
            screenshot: 'data:image/png;base64,as5d456as4d65asd564'
        })).resolves.not.toThrow();

        expect(createFeedBackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })
    
    test("should not be able to submit feedback without type", async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: "example comment",
            screenshot: 'data:image/png;base64,as5d456as4d65asd564'
        })).rejects.toThrow();
    })
    
    test("should not be able to submit feedback without comment", async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: "",
            screenshot: 'data:image/png;base64,as5d456as4d65asd564'
        })).rejects.toThrow();
    })
    
    test("should not be able to submit feedback with an invalid screenshot", async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: "Bug de mais :O",
            screenshot: 'image.svg'
        })).rejects.toThrow();
    })
})