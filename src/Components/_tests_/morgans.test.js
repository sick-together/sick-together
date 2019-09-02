import {
    handleClose, 
    handleOpen, 
    handleChange, 
    handleSubmit, 
    fileUploadHandler
} from "../logic/logic"; 
import { exportAllDeclaration } from "@babel/types";

describe("Tests handleClose function", () => {
    it("should be a function", () => {
        expect(typeof handleClose).toBe('function')
    })
}); 

describe("Tests handleOpen function", () => {
    it("should be a function", () => {
        expect(typeof handleOpen).toBe('function')
    })
}); 

describe("Tests handleChange function", () => {
    it("should be a function", () => {
        expect(typeof handleChange).toBe('function')
    })
}); 

describe("Tests handleSubmit function", () => {
    it("should be a function", () => {
        expect(typeof handleSubmit).toBe('function')
    })
}); 

describe("Tests fileUploadHandler function", () => {
    it("should be a function", () => {
        expect(typeof fileUploadHandler).toBe('function')
    })
}); 
